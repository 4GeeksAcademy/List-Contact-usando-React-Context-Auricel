const contactDispatcher = {
    get: async () => {
        const response = await fetch('https://playground.4geeks.com/contact/agendas/Auricel/contacts');
        const data = await response.json();
        return data.contacts;
    },
};
export default contactDispatcher;