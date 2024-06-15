const ContactSection = () => {
    return (
        <section className="border p-4 rounded-lg shadow-lg m-4" id="contact">
            <h2 className="text-blue-700 text-2xl font-bold mb-4">Contato</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">Nome</label>
                    <input className="w-full p-2 border rounded bg-stone-300" type="text" id="name" name="name" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">E-mail</label>
                    <input className="w-full p-2 border rounded bg-stone-300" type="email" id="email" name="email" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="message">Dúvida, sugestão ou comentário</label>
                    <textarea className="w-full p-2 border rounded bg-stone-300" id="message" name="message" rows={4}></textarea>
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full">ENVIAR</button>
            </form>
        </section>
    );
};

export default ContactSection;
