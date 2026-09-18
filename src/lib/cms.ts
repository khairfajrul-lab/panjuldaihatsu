import { supabase } from "./supabase";
import { SITE_CONFIG, vehicles as fallbackVehicles, type Vehicle } from "@/data/vehicles";

export type CmsSiteSettings = {
  id?: number;
  sales_name: string;
  whatsapp_number: string;
  phone?: string;
  address?: string;
  hero_title: string;
  hero_subtitle: string;
  instagram_url?: string;
  tiktok_url?: string;
  facebook_url?: string;
};

export type CmsVehicle = Vehicle & {
  id?: string;
  installment?: string;
  is_active?: boolean;
};

type CarRow = {
  id: string;
  name: string;
  slug: string;
  price: string | number | null;
  installment: string | null;
  description: string | null;
  transmission: string | null;
  colors: string | null;
  image_url: string | null;
  gallery: unknown;
  specs: Record<string, unknown> | null;
  is_active: boolean;
};

function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[,\n|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function specsObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function rowToVehicle(row: CarRow): CmsVehicle {
  const specs = specsObject(row.specs);
  const highlights = Array.isArray(specs.highlights)
    ? specs.highlights.filter((item): item is string => typeof item === "string")
    : [];
  const transmissions = parseList(row.transmission);
  const colors = parseList(row.colors);
  const category = typeof specs.category === "string" ? specs.category : "Daihatsu";

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category,
    description: row.description ?? "",
    price: String(row.price ?? ""),
    installment: row.installment ?? "",
    image: row.image_url ?? "",
    highlights,
    transmissions,
    colors,
    is_active: row.is_active,
  };
}

function vehicleToPayload(vehicle: CmsVehicle, existingSpecs: unknown = {}) {
  const currentSpecs = specsObject(existingSpecs);
  return {
    slug: vehicle.slug,
    name: vehicle.name,
    price: vehicle.price,
    installment: vehicle.installment ?? "",
    description: vehicle.description,
    transmission: vehicle.transmissions.join(", "),
    colors: vehicle.colors.join(", "),
    image_url: vehicle.image,
    specs: {
      ...currentSpecs,
      category: vehicle.category,
      highlights: vehicle.highlights,
    },
    is_active: vehicle.is_active ?? true,
    updated_at: new Date().toISOString(),
  };
}

export async function getPublicVehicles(): Promise<CmsVehicle[]> {
  if (!supabase) return fallbackVehicles;
  const { data, error } = await supabase
    .from("cars")
    .select("id,name,slug,price,installment,description,transmission,colors,image_url,gallery,specs,is_active")
    .eq("is_active", true)
    .order("name");
  if (error || !data?.length) return fallbackVehicles;
  return (data as CarRow[]).map(rowToVehicle);
}

export async function getPublicSite(): Promise<CmsSiteSettings> {
  if (!supabase) return SITE_CONFIG as CmsSiteSettings;
  const { data, error } = await supabase
    .from("site_settings")
    .select("id,sales_name,whatsapp,phone,address,hero_title,hero_description")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return SITE_CONFIG as CmsSiteSettings;
  return {
    id: data.id,
    sales_name: data.sales_name ?? SITE_CONFIG.sales_name,
    whatsapp_number: data.whatsapp ?? SITE_CONFIG.whatsapp_number,
    phone: data.phone ?? "",
    address: data.address ?? "",
    hero_title: data.hero_title ?? SITE_CONFIG.hero_title,
    hero_subtitle: data.hero_description ?? SITE_CONFIG.hero_subtitle,
  };
}

export async function getAdminVehicles(): Promise<CmsVehicle[]> {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi.");
  const { data, error } = await supabase
    .from("cars")
    .select("id,name,slug,price,installment,description,transmission,colors,image_url,gallery,specs,is_active")
    .order("name");
  if (error) throw error;
  return ((data ?? []) as CarRow[]).map(rowToVehicle);
}

export async function saveVehicle(vehicle: CmsVehicle) {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi.");

  let existingSpecs: unknown = {};
  if (vehicle.id) {
    const { data } = await supabase.from("cars").select("specs").eq("id", vehicle.id).maybeSingle();
    existingSpecs = data?.specs ?? {};
  }

  const payload = vehicleToPayload(vehicle, existingSpecs);
  const query = vehicle.id
    ? supabase.from("cars").update(payload).eq("id", vehicle.id).select("id,name,slug,price,installment,description,transmission,colors,image_url,gallery,specs,is_active").single()
    : supabase.from("cars").insert(payload).select("id,name,slug,price,installment,description,transmission,colors,image_url,gallery,specs,is_active").single();
  const { data, error } = await query;
  if (error) throw error;
  return rowToVehicle(data as CarRow);
}

export async function deleteVehicle(id: string) {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi.");
  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) throw error;
}

export async function saveSiteSettings(settings: CmsSiteSettings) {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi.");
  const payload = {
    id: 1,
    sales_name: settings.sales_name,
    whatsapp: settings.whatsapp_number,
    phone: settings.phone ?? "",
    address: settings.address ?? "",
    hero_title: settings.hero_title,
    hero_description: settings.hero_subtitle,
  };
  const { data, error } = await supabase.from("site_settings").upsert(payload).select("id,sales_name,whatsapp,phone,address,hero_title,hero_description").single();
  if (error) throw error;
  return {
    id: data.id,
    sales_name: data.sales_name,
    whatsapp_number: data.whatsapp,
    phone: data.phone ?? "",
    address: data.address ?? "",
    hero_title: data.hero_title,
    hero_subtitle: data.hero_description,
  } as CmsSiteSettings;
}

export async function uploadVehicleImage(file: File) {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi.");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const path = `vehicles/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from("vehicle-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("vehicle-images").getPublicUrl(path);
  return data.publicUrl;
}
