import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Bookmark, BookmarkCheck, X, Zap, Globe, Building2, Loader2 } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'scholarship' | 'grant' | 'internship';
  description: string;
  deadline: string;
  location?: string;
  isAISuggested?: boolean;
  tags: string[];
  url: string;
  sponsorsVisa?: boolean;
  sponsorsH1B?: boolean;
  logo?: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSave: (id: string) => void;
  onDiscard: (id: string) => void;
  onTaskAgent: (opportunity: Opportunity) => void;
  isSaved: boolean;
  isWorking?: boolean;
}

const typeColors = {
  scholarship: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  grant: 'bg-green-500/10 text-green-400 border-green-500/20',
  internship: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'summer-camp': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  competition: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const OpportunityCard = ({ opportunity, onSave, onDiscard, onTaskAgent, isSaved, isWorking = false }: OpportunityCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeColor = typeColors[opportunity.type];

  return (
    <div className="bg-gradient-to-br from-[#FDFDFD0D] to-[#F0F0E41A] border-2 border-[#FFFFFF0D] rounded-lg p-4 backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {opportunity.logo ? (
              <img 
                src={opportunity.logo} 
                alt={opportunity.organization}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to first letter if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-full h-full bg-primary rounded-lg flex items-center justify-center ${opportunity.logo ? 'hidden' : ''}`}>
              <span className="text-primary-foreground font-bold text-sm">
                {opportunity.organization.charAt(0)}
              </span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
              {opportunity.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
            </div>
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
        <div className="flex items-center gap-2">
          <Badge className={typeColor}>
            {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
          </Badge>
          {opportunity.location && (
            <Badge variant="outline" className="text-xs">
              📍 {opportunity.location}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {opportunity.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
          {opportunity.tags.length > 2 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{opportunity.tags.length - 2}
            </Badge>
          )}
        </div>
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

      {/* Sponsorship Indicators */}
      <div className="flex items-center justify-end gap-2">
        {opportunity.isAISuggested && (
          <Badge variant="outline" className="text-xs flex items-center gap-1 px-2 py-0.5 bg-green-400/20 text-green-300 border-green-400/30">
            <Zap className="h-3 w-3" />
            AI Suggested
          </Badge>
        )}
        {opportunity.sponsorsVisa && (
          <Badge variant="outline" className="text-xs flex items-center gap-1 px-2 py-0.5">
            <Globe className="h-3 w-3" />
            Visa Sponsor
          </Badge>
        )}
        {opportunity.sponsorsH1B && (
          <Badge variant="outline" className="text-xs flex items-center gap-1 px-2 py-0.5">
            <Building2 className="h-3 w-3" />
            H1B Sponsor
          </Badge>
        )}
        {isWorking && (
          <Badge variant="outline" className="text-xs flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Loader2 className="h-3 w-3 animate-spin" />
            Agent Working
          </Badge>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <Button
          variant="outline"
          onClick={() => onTaskAgent(opportunity)}
          disabled={isWorking}
          className="dashboard-card-button px-3 py-1 h-8 text-sm text-[#FFFFFF] disabled:opacity-50"
        >
          {isWorking ? (
            <>
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Working...
            </>
          ) : (
            '🤖 Task Agent'
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => onDiscard(opportunity.id)}
          disabled={isWorking}
          className="dashboard-card-button px-3 py-1 h-8 text-sm text-[#FF8585] disabled:opacity-50"
        >
          <X className="h-3 w-3 mr-1" />
          Discard
        </Button>
        <Button
          variant="outline"
          onClick={() => onSave(opportunity.id)}
          disabled={isWorking}
          className="dashboard-card-button px-3 py-1 h-8 text-sm text-[#FFFFFF] disabled:opacity-50"
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

export default OpportunityCard;