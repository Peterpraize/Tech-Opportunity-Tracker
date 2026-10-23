
import { Link } from 'react-router-dom'
import { useSavedOpportunities } from '../context/useSavedOpportunities'

function OpportunityCard({ opportunity }) {
  const { savedIds, toggleSaved } = useSavedOpportunities()
  const isSaved = savedIds.includes(opportunity.id)

  return (
    <article className="opportunity-card">
      <div className="card-topline">
        <span
          className={`category-pill ${opportunity.category.toLowerCase()}`}
        >
          {opportunity.category}
        </span>

        <button
          type="button"
          onClick={() => toggleSaved(opportunity.id)}
          aria-pressed={isSaved}
        >
          {isSaved ? '♥ Saved' : '♡ Save'}
        </button>
      </div>

      <div className="organization-name">
        {opportunity.organization}
      </div>

      <h3>
        <Link
          to={`/opportunities/${opportunity.id}`}
          className="opportunity-title-link"
        >
          {opportunity.title}
        </Link>
      </h3>

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

        <span className="work-type">
          {opportunity.type}
        </span>
      </div>

      <Link
        to={`/opportunities/${opportunity.id}`}
        className="secondary-button"
      >
        View details →
      </Link>
    </article>
  )
}

export default OpportunityCard
