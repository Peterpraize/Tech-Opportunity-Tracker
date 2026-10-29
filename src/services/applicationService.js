
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

  const newApplication = {
    ...application,
    id: crypto.randomUUID(),
    status: 'Recorded locally',
    submittedAt: new Date().toISOString(),
  };

  const updatedApplications = [newApplication, ...applications];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedApplications)
  );

  return newApplication;
}
