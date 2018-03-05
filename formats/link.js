import Inline from '../blots/inline';


class Link extends Inline {
  static create(value) {
    let node = super.create(value);
    value = this.sanitize(value);
    value = this.makeURLValid(value);
    node.setAttribute('href', value);
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'link');
    return node;
  }

  static formats(domNode) {
    return domNode.getAttribute('href');
  }

  static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }

  static makeURLValid(url) {
    return makeURLValid(url)
  }

  format(name, value) {
    if (name !== this.statics.blotName || !value) return super.format(name, value);
    value = this.constructor.sanitize(value);
    value = this.constructor.makeURLValid(value);
    this.domNode.setAttribute('href', value);
  }
}
Link.blotName = 'link';
Link.tagName = 'A';
Link.SANITIZED_URL = 'about:blank';
Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];


function sanitize(url, protocols) {
  let anchor = document.createElement('a');
  anchor.href = url;
  let protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

function makeURLValid(url) {
  if (!(/^http?:\/\//i.test(url))){
    if (/^https?:\/\//i.test(url)) {
      return url
    }
    return "https://" + url
  }
  return url
}


export { Link as default, sanitize };
