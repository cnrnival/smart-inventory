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
    async function request(){
      try {
        let response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${result}.json`)
        let data = await response.json();
        if (data.product && data.product.product_name) {
          fillFormWithBarcodeData(data.code, data.product.product_name);
          setOpenScanner();
        } else {
          console.warn("Produto não encontrado ou sem nome");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert('Erro ao buscar dados do produto. Verifique o código de barras e tente novamente.');
      }
    }
    request();
  }, [result])

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center h-full w-full select-none" 
      onClick={setOpenScanner}>
        <div className="w-[450px] h-[759px] rounded-xl bg-primary shadow-sm flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
          <video ref={ref} className="w-80 h-80"/>
          <p>
            <span>Last result:</span>
            <span>{result}</span>
          </p>
      </div>
    </div>
  );
};