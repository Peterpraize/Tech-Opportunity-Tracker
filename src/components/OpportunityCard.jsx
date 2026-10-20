
function OpportunityCard({ opportunity, isSaved, onToggleSaved }) {
  return (
    <article className="opportunity-card">
      <div className="card-topline">
        <span
          className={`category-pill ${opportunity.category.toLowerCase()}`}
        >
          {opportunity.category}
        </span>

        <button
          className={`save-button ${isSaved ? 'is-saved' : ''}`}
          type="button"
          onClick={() => onToggleSaved(opportunity.id)}
          aria-pressed={isSaved}
          aria-label={`${isSaved ? 'Remove' : 'Save'} ${opportunity.title}`}
        >
          {isSaved ? '♥' : '♡'}
        </button>
      </div>

      <div className="organization-name">
        {opportunity.organization}
      </div>

      <h3>{opportunity.title}</h3>

      <p className="card-description">
        {opportunity.description}
      </p>

      <div className="tag-list">
        {opportunity.tags.map((tag) => (
          <span className="skill-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="card-footer">
        <div className="deadline">
          <span aria-hidden="true">◷</span>
          <span>Deadline: {opportunity.deadline}</span>
        </div>

        <span className="work-type">{opportunity.type}</span>
      </div>
    </article>
  )
}

export default OpportunityCard
