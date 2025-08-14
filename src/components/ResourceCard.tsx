import { Button } from '@/components/ui/button';
import { ExternalLink, Bookmark, BookmarkCheck, X } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  source: string;
  description: string;
  url: string;
  publishedAt: string;
  readTime?: string;
}

interface ResourceCardProps {
  resource: Resource;
  onSave: (id: string) => void;
  onDiscard: (id: string) => void;
  isSaved: boolean;
}

const sourceColors = {
  'reddit.com': 'bg-orange-500/10 text-orange-400',
  'ycombinator.com': 'bg-orange-600/10 text-orange-500',
  'medium.com': 'bg-green-500/10 text-green-400',
  'default': 'bg-gray-500/10 text-gray-400'
};

const ResourceCard = ({ resource, onSave, onDiscard, isSaved }: ResourceCardProps) => {
  const getSourceColor = (source: string) => {
    const domain = source.toLowerCase();
    if (domain.includes('reddit')) return sourceColors['reddit.com'];
    if (domain.includes('ycombinator')) return sourceColors['ycombinator.com'];
    if (domain.includes('medium')) return sourceColors['medium.com'];
    return sourceColors.default;
  };

  const sourceColor = getSourceColor(resource.source);

  return (
    <div className="bg-card-glass border border-card-border rounded-lg p-4 backdrop-blur-md space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${sourceColor}`}>
            <span className="text-xs font-bold">
              {resource.source.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground line-clamp-2 leading-tight mb-1">
              {resource.title}
            </h3>
            <p className="text-xs text-muted-foreground">{resource.source}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(resource.url, '_blank')}
          className="flex-shrink-0 h-8 w-8"
        >
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>

      {/* Description */}
      <p className="text-sm text-foreground leading-relaxed line-clamp-3">
        {resource.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{new Date(resource.publishedAt).toLocaleDateString()}</span>
        {resource.readTime && <span>{resource.readTime} read</span>}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <Button
          variant="minimal"
          size="sm"
          onClick={() => onDiscard(resource.id)}
          className="flex-1 h-8"
        >
          <X className="h-3 w-3 mr-1" />
          Discard
        </Button>
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          onClick={() => onSave(resource.id)}
          className="flex-1 h-8"
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="h-3 w-3 mr-1" />
              Saved
            </>
          ) : (
            <>
              <Bookmark className="h-3 w-3 mr-1" />
              Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;