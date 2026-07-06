"use client";

export type PhotoViewerItem = {
  alt: string;
  foregroundImage: string;
  foregroundHeight: number;
  foregroundWidth: number;
};

type PhotoViewerProps = {
  className?: string;
  items?: PhotoViewerItem[];
};

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
  items,
}: PhotoViewerProps) {
  const wrapperClassName = ['fan-moments-photo-viewer', className]
    .filter(Boolean)
    .join(' ');
  const columns = getColumns(items || []);

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
