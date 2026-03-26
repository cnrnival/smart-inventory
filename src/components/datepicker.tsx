import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale'
import { useState } from "react";

registerLocale('pt-BR', ptBR);

type Prop = {
    expirationDatePicker: (newDate: Date) => void;
    selectedDate: Date;
}

export function DatePickerComponent({ expirationDatePicker, selectedDate }: Prop){

    return (
        <DatePicker 
            selected={selectedDate}
            onChange={(newDate: Date | null)=> {
                if(newDate){
                    expirationDatePicker(newDate);
                }
            }}
            locale={`pt-BR`}
            className={`w-full h-[40px] border border-gray-300 rounded-md mb-3 text-white text-md p-2`}
            dateFormat={`dd/MM/yyyy`}
            minDate={new Date()}
        />
    )
}