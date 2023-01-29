type Props = {
    step:number
}

const ProgressBar: React.FC<Props> = ({step}) => {

    let stepMaker = (step:number) => {
    }
    return (
        <div className="inline-flex">
            {step >= 1? <div id="bar1" className="px-2 py-4 rounded-full bg-green-600">step 1</div> : <div className="px-2 py-4 rounded-full bg-green-600 opacity-50">step 1</div>}
            {step >= 2? <div id="bar2" className="px-2 py-4 rounded-full bg-green-600">step 2</div> : <div className="px-2 py-4 rounded-full bg-green-600 opacity-50">step 2</div>}
            {step >= 3? <div id="bar3" className="px-2 py-4 rounded-full bg-green-600">step 2</div> : <div className="px-2 py-4 rounded-full bg-green-600 opacity-50">step 3</div>}
            {step >= 4? <div id="bar4" className="px-2 py-4 rounded-full bg-green-600">step 4</div> : <div className="px-2 py-4 rounded-full bg-green-600 opacity-50">submit</div>}
        </div>
    )
};

export default ProgressBar