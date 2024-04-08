export function validateInput(nameOfEvent, participants, date, details) {
    if (!nameOfEvent.trim()) {
        return false;
    }

    for (let i = 0; i < participants.length; i++) {
        if (!participants[i].trim()) {
            return false;
        }
    }

    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{2}$/;
    if (!date.trim() || !dateRegex.test(date)) {
        alert('Date must be in the format dd/mm/yy');
        return false;
    }

    if (!details.trim()) {
        return false;
    }

    return true;
}