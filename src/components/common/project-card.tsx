import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface Props {
  title: string;
  description: string;
  // tags: readonly string[];
  link?: string;
}

export const ProjectCard = ({ title, description, link }: Props) => {
  return (
    <Card className="flex flex-col overflow-hidden p-4">
      <CardHeader className="">
        <div className="space-y-1">
          <CardTitle>
            {link ? (
              <a
                href={link}
                target="_blank"
                className="inline-flex items-center gap-1 hover:underline">
                {title}
                <span className="size-1 rounded-full bg-green-500"></span>
              </a>
            ) : (
              title
            )}
          </CardTitle>
          <div className="hidden font-mono text-xs underline print:visible">
            {link?.replace('https://', '').replace('www.', '').replace('/', '')}
          </div>
          <CardDescription className="font-mono text-xs print:text-[10px]">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      {/* <CardContent className="mt-auto flex">
        <div>
          {tags.map((tag) => (
            <Badge
              className="px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
              variant="secondary"
              key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent> */}
    </Card>
  );
};
