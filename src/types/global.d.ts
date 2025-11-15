interface Window {
  gtag: (
    event: string,
    action: string,
    params: { [key: string]: string | number | string[] | undefined }
  ) => void;
}
