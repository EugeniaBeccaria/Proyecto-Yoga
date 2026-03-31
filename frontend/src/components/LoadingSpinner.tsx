import '../styles/LoadingSpinner.css';

type SpinnerProps = {
    inline?: boolean;
};

const Spinner = ({ inline = false }: SpinnerProps) => {
    return (
        <div className={`spinner-overlay ${inline ? 'inline' : ''}`}>
            <div className="yoga-spinner"></div>
        </div>
    );
};

export default Spinner;