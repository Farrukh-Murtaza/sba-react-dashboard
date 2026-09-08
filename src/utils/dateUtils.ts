export function formatDueDate(
    dateString: string
): string {
    if (!dateString) {
        return "No due date";
    }

    const date = new Date(
        `${dateString}T00:00:00`
    );

    if (Number.isNaN(date.getTime())) {
        return "Invalid date";
    }

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    ).format(date);
}

export function isOverdue(
    dateString: string
): boolean {
    if (!dateString) {
        return false;
    }

    const dueDate = new Date(
        `${dateString}T23:59:59`
    );

    return dueDate < new Date();
}