import { LuGlobe, LuNetwork, LuShieldCheck } from 'react-icons/lu';

type TouringMovesProps = {
  className?: string;
};

const touringCapabilities = [
  {
    Icon: LuGlobe,
    label: 'Operates across all major touring markets',
  },
  {
    Icon: LuShieldCheck,
    label: 'Supports international currencies and compliance',
  },
  {
    Icon: LuNetwork,
    label: 'Coverage expands automatically with routing needs',
  },
];

export default function TouringMoves({ className }: TouringMovesProps) {
  const wrapperClassName = ['touring-moves', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClassName} aria-labelledby="touring-moves-title">
      <div className="touring-moves__inner">
        <div className="touring-moves__content">
          <header className="touring-moves__header">
            <h2 className="touring-moves__title" id="touring-moves-title">
              Built for How Touring Actually Moves
            </h2>
            <div className="touring-moves__description">
              <p>Tours change. Routing shifts. Markets expand.</p><br />
              <p>National Acts is structured to scale with the tour—not slow it down.</p>
            </div>
          </header>

          <ul className="touring-moves__capabilities">
            {touringCapabilities.map(({ Icon, label }) => (
              <li className="touring-moves__capability" key={label}>
                <Icon className="touring-moves__icon" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="touring-moves__visual" aria-hidden="true">
          <img src="/images/b2b/touring-moves.webp" alt="" />
        </div>
      </div>
    </section>
  );
}
