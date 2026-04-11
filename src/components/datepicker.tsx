import DatePicker from "react-datepicker";
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale'

registerLocale('pt-BR', ptBR);

type Prop = {
    expiryDatePicker: (newDate: Date) => void;
    selectedDate: Date;
}

export function DatePickerComponent({ expiryDatePicker, selectedDate }: Prop){

    return (
        <DatePicker 
            selected={selectedDate}
            onChange={(newDate: Date | null)=> {
                if(newDate){
                    expiryDatePicker(newDate);
                }
            }}
            locale={`pt-BR`}
            className={`w-[310px] h-full border border-gray-300 rounded-md text-black/70 text-md p-2 bg-[#E8E9E8] `}
            dateFormat={`dd-MM-yyyy`}
            minDate={new Date()}
        />
    )
}