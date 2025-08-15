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
  logo?: string;
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
    <div className="bg-gradient-to-br from-[#FDFDFD0D] to-[#F0F0E41A] border-2 border-[#FFFFFF0D] rounded-lg p-3 sm:p-4 backdrop-blur-md space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {resource.logo ? (
              <img 
                src={resource.logo} 
                alt={resource.source}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to first letter if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${resource.logo ? 'hidden' : ''} ${sourceColor}`}>
              <span className="text-xs sm:text-sm font-bold">
                {resource.source.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground line-clamp-2 leading-tight mb-1 text-sm sm:text-base">
              {resource.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{resource.source}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(resource.url, '_blank')}
          className="flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8"
        >
          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-foreground leading-relaxed line-clamp-3">
        {resource.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-end text-xs text-muted-foreground">
        {resource.readTime && <span>{resource.readTime} read</span>}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1 sm:gap-2 pt-2">
        <Button
          variant="outline"
          onClick={() => onDiscard(resource.id)}
          className="dashboard-card-button px-2 sm:px-3 py-1 h-7 sm:h-8 text-xs sm:text-sm text-[#FF8585]"
        >
          <X className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Discard</span>
          <span className="sm:hidden">X</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => onSave(resource.id)}
          className="dashboard-card-button px-2 sm:px-3 py-1 h-7 sm:h-8 text-xs sm:text-sm text-[#FFFFFF]"
          >
          {isSaved ? (
            <>
              <BookmarkCheck className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Saved</span>
              <span className="sm:hidden">✓</span>
            </>
          ) : (
            <>
              <Bookmark className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Save</span>
              <span className="sm:hidden">☆</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;