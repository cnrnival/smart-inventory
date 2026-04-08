import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { toast } from "sonner"; // ✅ import adicionado

type Props = {
  setOpenScanner: () => void;
  fillFormWithBarcodeData: (barcode: string, productName: string) => void;
};

export const BarcodeScanner = ({ setOpenScanner, fillFormWithBarcodeData }: Props) => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    if (!result) return;

    async function request() {
      try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${result}.json`);
        const data = await response.json();
        if (data.product && data.product.product_name) {
          fillFormWithBarcodeData(data.code, data.product.product_name);
          setOpenScanner();
        } else {
          toast.warning("Produto não encontrado. Preencha manualmente.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do produto:", error);
        toast.error("Erro ao buscar dados do produto. Verifique o código de barras.");
      }
    }
    request();
  }, [result, fillFormWithBarcodeData, setOpenScanner]); 

  return (
    <div
      className="absolute inset-0 flex items-center justify-center h-full w-full select-none md:p-10"
      onClick={setOpenScanner}
    >
      <div
        className="md:rounded-xl bg-primary shadow-sm flex flex-col items-center md:justify-center p-6 h-full w-[450px] md:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-[60px] flex items-center justify-end" onClick={setOpenScanner}>
          <button className="w-[60px] h-[30px] border rounded-lg border-white text-white">voltar</button>
        </div>
        <video ref={ref} className="size-60 object-cover" />
        <p className="mt-4 text-sm text-white">
          <span>Último resultado: </span>
          <span>{result}</span>
        </p>
      </div>
    </div>
  );
};