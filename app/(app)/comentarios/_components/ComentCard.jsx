export default function ComentCard({titulo,mensaje}) {
    return (
        <div className="card text-bg-light mb-3" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">
                    {mensaje}
                </p>
            </div>
        </div>
    );
}
