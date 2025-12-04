"use client";
import "./Footer.css";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export default function Footer() {
    // Tipagem do formulário
    const [formData, setFormData] = useState({
        from_name: "",
        reply_to: "",
        subject: "",
        message: "",
    });

    const [feedback, setFeedback] = useState("");
    const [feedbackColor, setFeedbackColor] = useState("");

    // Tipagem do evento de input
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Tipagem do evento de submit
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs
            .send(
                "service_zohk8eq",   // Service ID
                "template_lyyz6kf",  // Template ID
                formData,
                "dD3SWbR7l1kkD4P-Z"  // Public Key
            )
            .then(() => {
                setFeedback("Mensagem enviada com sucesso!");
                setFeedbackColor("green");

                setFormData({
                    from_name: "",
                    reply_to: "",
                    subject: "",
                    message: "",
                });
            })
            .catch((error) => {
                console.error("Erro:", error);
                setFeedback("Erro ao enviar. Tente novamente.");
                setFeedbackColor("red");
            });
    };

    return (
        <footer>
            <section className="pai" id="contatos">
                <div className="footer-logo">
                    <Image src="/logoTerra.png" alt="Logo" width={70} height={70} />
                    <p>TerraTech</p>
                </div>

                <div className="footer-redes">
                    <h1>Nossas redes sociais</h1>

                    <div className="juncao_insta">
                        <Image src="/insta.png" alt="Instagram" width={45} height={45} />
                        <div className="desc_insta">
                            <h1>Instagram</h1>
                            <p>@terratech.emp</p>
                        </div>
                    </div>

                    <div className="juncao_x">
                        <Image src="/x.png" alt="X/Twitter" width={50} height={50} />
                        <div className="desc_x">
                            <h1>X (Twitter)</h1>
                            <p>/terratech_emp</p>
                        </div>
                    </div>
                </div>

                <div className="footer-faleconosco">
                    <h1>Fale Conosco</h1>

                    <form onSubmit={handleSubmit} className="questionario">
                        <textarea
                            name="from_name"
                            placeholder="Nome Completo"
                            required
                            value={formData.from_name}
                            onChange={handleChange}
                        />

                        <textarea
                            name="reply_to"
                            placeholder="E-mail"
                            required
                            value={formData.reply_to}
                            onChange={handleChange}
                        />

                        <textarea
                            name="subject"
                            placeholder="Assunto"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                        />

                        <textarea
                            name="message"
                            placeholder="Mensagem"
                            required
                            value={formData.message}
                            onChange={handleChange}
                        />

                        <button type="submit">Enviar</button>
                    </form>

                    {feedback && (
                        <p style={{ color: feedbackColor, marginTop: "10px" }}>
                            {feedback}
                        </p>
                    )}
                </div>
            </section>
        </footer>
    );
}