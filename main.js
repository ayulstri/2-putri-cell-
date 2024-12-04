import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFYmmVvk-jLZIeAdYKiTwVw2jqd4VINFA",
  authDomain: "insan-cemerlang.firebaseapp.com",
  projectId: "insan-cemerlang",
  storageBucket: "insan-cemerlang.appspot.com",
  messagingSenderId: "579109661574",
  appId: "1:579109661574:web:4a7cd4060f70eded945a07"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//fungsi untuk menampilkan data dari data base
export async function ambilDaftarPembeli() {
  const refDokumen = collection(db, "pembeli");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      no: dok.data(). nomor,
      no handphone: dok.data(). no handphone,
      nominal isi: dok.data(). nominal isi
      harga: dok.data(). harga
    });
  });
  
  
  
  return hasil;
}
//####№############33333$$##$$$$$$$##$$$
export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function  tambahPembeli(no, no handphone, nominal isi, harga) {
  try {
    const dokRef = await addDoc(collection(db, 'pembeli'), {
      no: no,
      no handphone: no handphone,
      nominal isi: nominal isi,
      harga: harga,
    });
    console.log('berhasil menambah pembeli' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah pembeli' + e);
   }
}


   export async function hapusPenjual(docId) {
  await deleteDoc(doc(db, "pembeli", docId));
}

export async function ubahPenjual(docId, nama, alamat, gmail, noTlpn) {
  await updateDoc(doc(db, "pembeli", docId), {
    nama: nama,
    alamat: alamat,
    gmail: gmail,
    noTlpn: noTlpn
  });
}

export async function ambilPembeli(docId) {
  const docRef = await doc(db, "pembeli", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}