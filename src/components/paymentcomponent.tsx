'use client'

type Props = {
    openPayment: () => void;
};

export function PaymentComponent({openPayment}: Props){
    return (
        <div className="w-screen h-screen bg-black/40 absolute top-0 left-0 flex items-center justify-center" onClick={e=>  e.stopPropagation()}>
            <div className="w-[700px] h-[500px] rounded-lg bg-green-300">
                <button onClick={openPayment}>oi</button>

            </div>
        </div>
    )
}