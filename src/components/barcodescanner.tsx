import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";

type Props = {
  setOpenScanner: () => void;
  fillFormWithBarcodeData: (barcode: string, productName: string) => void;
}

export const BarcodeScanner = ({ setOpenScanner, fillFormWithBarcodeData }: Props) => {

  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {

    if (!result) return;

    async function request(){
      try {
        let response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${result}.json`)
        let data = await response.json();
        if (data.product && data.product.product_name) {
          fillFormWithBarcodeData(data.code, data.product.product_name);
        } else {
          alert("Produto não encontrado na API. Preenchendo apenas o código.");
          fillFormWithBarcodeData(result, ""); 
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert('Erro ao buscar dados do produto. Verifique o código de barras e tente novamente.');
      } finally {
        setOpenScanner();
      }
    }
    request();
  }, [result])

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center h-full w-full select-none md:p-10 bg-black/20" 
      onClick={setOpenScanner}>
        <div 
          className=" md:rounded-xl bg-primary shadow-sm flex flex-col items-center md:justify-center p-6 bg-[#6b9dff]
          h-[550px] w-[700px] md:py-10" 
          onClick={e => e.stopPropagation()}>
            <div className="w-full h-[60px] flex items-center justify-end" 
            onClick={setOpenScanner}>
              <button className="w-[60px] h-[30px] border rounded-lg border-white text-white md:hidden">voltar</button>
            </div>
            <video ref={ref} className="size-60 object-cover"/>
            <p className="mt-4 text-sm text-white">
              <span>Código de barras: </span>
              <span>{result}</span>
            </p>
        </div>
    </div>

  );
};