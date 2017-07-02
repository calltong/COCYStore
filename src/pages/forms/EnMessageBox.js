import swal from 'sweetalert';

export class EnMessageBox {
  display(title, text, option={time:4000, confirm: true}) {
    swal({
      title: title,
      text: text,
      timer: option.time,
      showConfirmButton: option.confirm
    });
  }

  displayConfirm(title, text, callback) {
    swal({
      title: title,
      text: text,
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
    },
    function(){
      callback();
    });
  }

}

const MessageBox = new EnMessageBox();
export default MessageBox;
