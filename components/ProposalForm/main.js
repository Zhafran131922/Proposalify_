// Import semua komponen yang diperlukan
import Form from './components/form';
import Image from './components/image';
import PDF from './components/pdf';
import Info from './components/info';
import LivePreview from './components/livepreview';
import AdditionalForm from './components/additionalform';

// Render semua komponen ke dalam DOM
const renderComponents = () => {
  // Panggil fungsi untuk merender formulir
  Form();

  // Panggil fungsi untuk merender fitur tambah gambar dan hapus gambar
  Image();

  // Panggil fungsi untuk merender fitur unduh ke PDF
  PDF();

  // Panggil fungsi untuk merender fitur tampilkan info
  Info();

  // Panggil fungsi untuk merender fitur live preview
//   LivePreview();

  // Panggil fungsi untuk merender pengelolaan data tambahan
  AdditionalForm();
};

// Panggil fungsi untuk merender semua komponen saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderComponents);
