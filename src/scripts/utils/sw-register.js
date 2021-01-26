import Swal from 'sweetalert2';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Gagal menginstall service-worker.',
        icon: 'error',
        confirmButtonColor: '#4caf50',
      });
    }
  } else {
    await Swal.fire({
      title: 'PWA tidak didukung',
      text: 'Beberapa fitur mungkin tidak akan bekerja dengan baik.',
      icon: 'warning',
      confirmButtonColor: '#4caf50',
    });
  }
};

export default swRegister;
