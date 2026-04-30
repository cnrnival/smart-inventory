import { ArrowLeft } from "lucide-react";
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
      className="absolute inset-0 flex items-center justify-center h-full w-full select-none md:p-10">
      <div
        className="  md:w-[700px] h-[550px] sm:w-[450px] rounded-xl flex flex-col justify-between bg-[#6b9dff] "
        // md:w-[700px] h-[550px] sm:w-[450px] h-full rounded-xl p-8 shadow-sm bg-[#6b9dff] shadow-sm flex flex-col items-center md:justify-center md:py-10
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-[40px] flex items-center justify-start" onClick={setOpenScanner}>
          <button className="w-[65px] h-[30px] rounded-lg text-white ml-2 flex flex-row items-center gap-1">
            <ArrowLeft  className="text-white size-6"/>
            <span className="text-sm uppercase">voltar</span>
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center rounded-md">
          <video ref={ref} className="size-50 object-cover  rounded-md" />
          <p className="mt-4 text-sm text-white">
            <span>Último resultado: </span>
            <span>{result}</span>
          </p>
        </div>
      </div>
    </div>
  );
};