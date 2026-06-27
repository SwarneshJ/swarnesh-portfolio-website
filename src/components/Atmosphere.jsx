// Fixed ambient background: drifting aurora blobs over a gradient mesh + grain.
// Purely decorative — base gradient and noise live on .atmosphere pseudo-elements.
const Atmosphere = () => (
    <div className="atmosphere" aria-hidden="true">
        <span className="aurora-blob b1" />
        <span className="aurora-blob b2" />
        <span className="aurora-blob b3" />
    </div>
);

export default Atmosphere;
