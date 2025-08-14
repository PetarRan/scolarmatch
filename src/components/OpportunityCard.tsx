import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Bookmark, BookmarkCheck, X, Zap } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'scholarship' | 'grant' | 'internship' | 'summer-camp' | 'competition';
  description: string;
  deadline: string;
  location?: string;
  isAISuggested?: boolean;
  tags: string[];
  url: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSave: (id: string) => void;
  onDiscard: (id: string) => void;
  isSaved: boolean;
}

const typeColors = {
  scholarship: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  grant: 'bg-green-500/10 text-green-400 border-green-500/20',
  internship: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'summer-camp': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  competition: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const OpportunityCard = ({ opportunity, onSave, onDiscard, isSaved }: OpportunityCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeColor = typeColors[opportunity.type];

  return (
    <div className="bg-card-glass border border-card-border rounded-lg p-4 backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-sm">
              {opportunity.organization.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground line-clamp-1">
                {opportunity.title}
              </h3>
              {opportunity.isAISuggested && (
                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                  <Zap className="h-3 w-3" />
                  AI Suggested
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(opportunity.url, '_blank')}
          className="flex-shrink-0"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      {/* Type and Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge className={typeColor}>
          {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
        </Badge>
        {opportunity.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
        {opportunity.tags.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{opportunity.tags.length - 2} more
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-foreground leading-relaxed">
        {isExpanded 
          ? opportunity.description 
          : `${opportunity.description.slice(0, 150)}${opportunity.description.length > 150 ? '...' : ''}`
        }
        {opportunity.description.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:underline ml-1"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Deadline: {opportunity.deadline}</span>
          {opportunity.location && <span>📍 {opportunity.location}</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <Button
          variant="secondary"
          onClick={() => onDiscard(opportunity.id)}
          className="flex-1"
        >
          <X className="h-4 w-4 mr-2" />
          Discard
        </Button>
        <Button
          variant="glass"
          className="flex-1"
        >
          🤖 Task Agent
        </Button>
        <Button
          variant={isSaved ? "default" : "outline"}
          onClick={() => onSave(opportunity.id)}
          className="flex-1"
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="h-4 w-4 mr-2" />
              Saved
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OpportunityCard;