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

export function createLink(item) {
  let path;
  switch (item.type) {
    case 'product':
      path = productPath(item.value, item.name);
      break;
    case 'category':
      path = productListPath(item.value, item.name);
      break;
    default:
  }
  return path;
}

export function productPath(id, name) {
  if (name === undefined) {
    name = '-';
  }
  return `/product/${id}/${tag(name)}`
}

export function productListPath(type, id, name) {
  if (name === undefined) {
    name = '-';
  }

  if (id === undefined || id === '') {
    id = 'all';
  }
  return `/product-list/${type}/${id}/${name}`;
}
