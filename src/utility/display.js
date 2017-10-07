export function money(val) {
  if (val === undefined || val === '') {
    return '0';
  } else {
    let text = val.toFixed(2).toString();
    return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}

export function text(val) {
  if (val === '' || val === undefined) {
    return '-';
  } else {
    return val;
  }
}

export function tag(val) {
  if (val === '' || val === undefined) {
    return '-';
  } else {
    return val.split(' ').join('-');
  }
}
