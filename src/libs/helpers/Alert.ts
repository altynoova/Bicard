import Swal from 'sweetalert2'

export function SuccessAlert(message: string) {
  Swal.fire({
    title: 'Успех!',
    text: message,
    icon: 'success',
    confirmButtonText: 'Ok',
    timer: 2000,
  })
}

export function ErrorAlert(message: string) {
  Swal.fire({
    title: 'Ошибка!',
    text: message,
    icon: 'error',
    confirmButtonText: 'Ok',
    timer: 2000,
  })
}