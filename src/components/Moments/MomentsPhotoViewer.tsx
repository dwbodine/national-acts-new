"use client";

export type PhotoViewerItem = {
  alt: string;
  backgroundImage: string;
  foregroundImage: string;
  foregroundHeight: number;
  foregroundWidth: number;
};

type PhotoViewerProps = {
  className?: string;
  items?: PhotoViewerItem[];
};

export const defaultPhotoViewerItems: PhotoViewerItem[] = [
  {
    alt: 'Testament',
    backgroundImage: 'images/moments/testament_bg.jpg',
    foregroundHeight: 430,
    foregroundImage: 'images/moments/testament_fg.jpg',
    foregroundWidth: 322.5,
  },
  {
    alt: 'Orpheum',
    backgroundImage: 'images/moments/orpheum_bg.jpg',
    foregroundHeight: 479,
    foregroundImage: 'images/moments/orpheum_fg.jpg',
    foregroundWidth: 498.562,
  },
  {
    alt: 'Lord of the Lost',
    backgroundImage: 'images/moments/lordofthelost_bg.jpg',
    foregroundHeight: 429,
    foregroundImage: 'images/moments/lordofthelost_fg.jpg',
    foregroundWidth: 644.171,
  },
  {
    alt: 'Exodus',
    backgroundImage: 'images/moments/exodus_bg.jpg',
    foregroundHeight: 512,
    foregroundImage: 'images/moments/exodus_fg.jpg',
    foregroundWidth: 683.933,
  },
  {
    alt: 'Exodus',
    backgroundImage: 'images/moments/exodus2_bg.jpg',
    foregroundHeight: 564,
    foregroundImage: 'images/moments/exodus2_fg.jpg',
    foregroundWidth: 752,
  },
  {
    alt: 'Lord of the Lost',
    backgroundImage: 'images/moments/lordofthelost2_bg.jpg',
    foregroundHeight: 960,
    foregroundImage: 'images/moments/lordofthelost2_fg.jpg',
    foregroundWidth: 1440,
  },
  {
    alt: 'Death to All',
    backgroundImage: 'images/moments/deathtoall_bg.jpg',
    foregroundHeight: 620,
    foregroundImage: 'images/moments/deathtoall_fg.jpg',
    foregroundWidth: 826.667,
  },
  {
    alt: 'Testament',
    backgroundImage: 'images/moments/testament3_bg.jpg',
    foregroundHeight: 496,
    foregroundImage: 'images/moments/testament3_fg.jpg',
    foregroundWidth: 372,
  },
];

const columnClassNames = [
  'fan-moments-photo-viewer__column fan-moments-photo-viewer__column--offset-medium',
  'fan-moments-photo-viewer__column',
  'fan-moments-photo-viewer__column fan-moments-photo-viewer__column--offset-large',
  'fan-moments-photo-viewer__column',
];

const getColumns = (items: PhotoViewerItem[]) => {
  const columns: PhotoViewerItem[][] = [[], [], [], []];

  items.forEach((item, index) => {
    columns[index % columns.length].push(item);
  });

  return columns;
};

export default function MomentsPhotoViewer({
  className,
  items = defaultPhotoViewerItems,
}: PhotoViewerProps) {
  const wrapperClassName = ['fan-moments-photo-viewer', className]
    .filter(Boolean)
    .join(' ');
  const columns = getColumns(items);

  return (
    <div className={wrapperClassName}>
      {columns.map((columnItems, columnIndex) => (
        <div
          key={`fan-moments-photo-viewer-column-${columnIndex}`}
          className={columnClassNames[columnIndex]}
        >
          {columnItems.map((item) => (
            <article key={item.foregroundImage} className="fan-moments-photo-viewer__card">
              <img
                className="fan-moments-photo-viewer__image fan-moments-photo-viewer__image--background"
                src={item.backgroundImage}
                alt={item.alt}
              />
              <img
                className="fan-moments-photo-viewer__image fan-moments-photo-viewer__image--foreground"
                src={item.foregroundImage}
                alt=""
                aria-hidden="true"
                style={{
                  height: `${item.foregroundHeight}px`,
                  width: `${item.foregroundWidth}px`,
                }}
              />
              <div className="fan-moments-photo-viewer__card-overlay" aria-hidden="true" />
            </article>
          ))}
        </div>
      ))}
      <div className="fan-moments-photo-viewer__fade" aria-hidden="true" />
    </div>
  );
}
