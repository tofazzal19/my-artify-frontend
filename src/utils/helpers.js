import Swal from 'sweetalert2'

export const showAlert = (message, type = 'info', showCancel = false) => {
  if (showCancel) {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: type,
      showCancelButton: true,
      confirmButtonColor: '#8B5CF6',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => result.isConfirmed)
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    
    Toast.fire({
      icon: type,
      title: message
    })
  }
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}