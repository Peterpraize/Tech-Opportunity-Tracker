
const STORAGE_KEY = 'techtrack-applications';

export function getApplications() {
  try {
    const storedApplications = localStorage.getItem(STORAGE_KEY);

    if (!storedApplications) {
      return [];
    }

    const applications = JSON.parse(storedApplications);

    return Array.isArray(applications) ? applications : [];
  } catch {
    return [];
  }
}

export function saveApplication(application) {
  const applications = getApplications();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const newApplication = {
    ...application,
    id,
    reference: `TT-${id.replaceAll('-', '').slice(0, 8).toUpperCase()}`,
    status: 'Application recorded',
    stage: 'recorded',
    submittedAt: now,
    updatedAt: now,
  };

  const updatedApplications = [newApplication, ...applications];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedApplications)
  );

  return newApplication;
}
