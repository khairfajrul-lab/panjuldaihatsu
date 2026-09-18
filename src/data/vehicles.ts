// AUTO-GENERATED. Edit content/site.yml and content/vehicles/*.yml instead.
import granmaxImg from "@/assets/granmax.jpg";
import aylaImg from "@/assets/ayla.jpg";
import sigraImg from "@/assets/sigra.jpg";
import teriosImg from "@/assets/terios.jpg";
import xeniaImg from "@/assets/xenia.jpg";
import rockyImg from "@/assets/rocky.jpg";

export const SALES_NAME = "Panjul";
export const WHATSAPP_NUMBER = "6281341297198";
export const SITE_CONFIG = {
  "sales_name": "Panjul",
  "whatsapp_number": "6281341297198",
  "hero_title": "Temukan Mobil Daihatsu yang Cocok untuk Kamu",
  "hero_subtitle": "Konsultasi langsung dengan Panjul untuk mendapatkan pilihan unit, promo, dan simulasi kredit sesuai kebutuhan.",
  "instagram_url": "",
  "tiktok_url": "",
  "facebook_url": ""
};

export function waLink(message: string) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }
export const WA_DEFAULT_MESSAGE = "Halo Kak Panjul, saya mau tanya mobil Daihatsu.";
export function waCarMessage(carName: string) { return `Halo Kak Panjul, saya mau tanya ${carName}. Bisa dibantu info harga dan cicilannya?`; }
export interface Vehicle { slug:string; name:string; category:string; description:string; price:string; image:string; highlights:string[]; transmissions:string[]; colors:string[]; }
const imageMap: Record<string,string> = {"/uploads/granmax.jpg":granmaxImg,"/uploads/ayla.jpg":aylaImg,"/uploads/sigra.jpg":sigraImg,"/uploads/terios.jpg":teriosImg,"/uploads/xenia.jpg":xeniaImg,"/uploads/rocky.jpg":rockyImg};
export const vehicles: Vehicle[] = [{"slug": "all-new-ayla", "name": "ALL NEW AYLA", "category": "City Car", "description": "City car yang praktis untuk aktivitas harian di perkotaan. Desain modern, nyaman digunakan dan cocok untuk kebutuhan mobilitas sehari-hari.", "price": "Mulai dari Rp XX.XXX.XXX", "image": "/uploads/ayla.jpg", "highlights": ["Bodi compact, gampang parkir di kota", "Irit bahan bakar untuk pemakaian harian", "Desain modern dan pilihan warna menarik", "Cocok untuk mobil pertama atau kendaraan harian"], "transmissions": ["Manual", "Automatic"], "colors": ["Kuning", "Putih", "Merah", "Silver", "Hitam"]}, {"slug": "all-new-terios", "name": "ALL NEW TERIOS", "category": "SUV", "description": "SUV tangguh dengan desain modern untuk menemani perjalanan keluarga maupun aktivitas dengan kebutuhan mobilitas yang lebih fleksibel.", "price": "Mulai dari Rp XX.XXX.XXX", "image": "/uploads/terios.jpg", "highlights": ["Ground clearance tinggi, siap segala medan", "Kapasitas 7 penumpang untuk keluarga besar", "Desain gagah dan modern", "Nyaman untuk perjalanan jauh"], "transmissions": ["Manual", "Automatic"], "colors": ["Merah", "Hitam", "Putih", "Abu-abu"]}, {"slug": "all-new-xenia", "name": "ALL NEW XENIA", "category": "MPV", "description": "MPV keluarga dengan desain modern, kabin nyaman dan fitur yang mendukung perjalanan bersama keluarga.", "price": "Mulai dari Rp XX.XXX.XXX", "image": "/uploads/xenia.jpg", "highlights": ["Kabin senyap dan nyaman untuk keluarga", "Fitur keselamatan modern", "Irit dan bertenaga untuk perjalanan jauh", "Pilihan favorit keluarga Indonesia"], "transmissions": ["Manual", "Automatic (CVT)"], "colors": ["Putih", "Silver", "Hitam", "Abu-abu"]}, {"slug": "grand-max-pick-up", "name": "GRAND MAX PICK UP", "category": "Pick Up", "description": "Partner usaha yang siap membantu kebutuhan angkut barang dan aktivitas bisnis sehari-hari. Memiliki kabin yang praktis dan area bak yang mendukung berbagai kebutuhan usaha.", "price": "Mulai dari Rp XX.XXX.XXX", "image": "/uploads/granmax.jpg", "highlights": ["Bak luas, siap angkut berbagai jenis barang", "Mesin irit dan bandel untuk pemakaian harian", "Sparepart mudah dan biaya perawatan terjangkau", "Cocok untuk usaha dagang, catering, dan logistik"], "transmissions": ["Manual"], "colors": ["Silver", "Hitam", "Putih"]}, {"slug": "new-rocky", "name": "NEW ROCKY", "category": "SUV", "description": "SUV compact dengan tampilan sporty dan modern, cocok untuk pengguna yang menginginkan kendaraan stylish untuk aktivitas sehari-hari.", "price": "Mulai dari Rp XX.XXX.XXX", "image": "/uploads/rocky.jpg", "highlights": ["Desain sporty dengan pilihan two-tone", "Mesin turbo yang responsif", "Fitur keselamatan canggih", "Compact tapi tetap nyaman di dalam"], "transmissions": ["Manual", "Automatic (CVT)"], "colors": ["Merah Two-Tone", "Hitam", "Putih", "Kuning"]}, {"slug": "new-sigra", "name": "NEW SIGRA", "category": "MPV", "description": "Mobil keluarga yang menawarkan kabin praktis dan kapasitas penumpang yang cocok untuk kebutuhan keluarga maupun aktivitas sehari-hari.", "price": "Mulai dari Rp XX.XXX.XXX", "image": "/uploads/sigra.jpg", "highlights": ["Kapasitas hingga 7 penumpang", "Kabin lega dan nyaman untuk keluarga", "Bagasi fleksibel untuk kebutuhan harian", "Harga bersahabat untuk mobil keluarga"], "transmissions": ["Manual", "Automatic"], "colors": ["Silver", "Putih", "Abu-abu", "Merah"]}] .map(v => ({ ...v, image: imageMap[v.image] ?? v.image }));
