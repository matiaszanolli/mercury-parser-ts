// this is a shim for the browser build;
// iconv-lite doubles build size, and we
// don't need it for already rendered text
type Iconv = {
  encodingExists: (enc: string) => boolean;
  decode: (enc: string) => string;
}

const iconv: Iconv = {
  encodingExists: () => false,
  decode: s => s,
};

export default iconv;
