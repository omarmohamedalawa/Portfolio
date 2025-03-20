import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaFileAlt } from "react-icons/fa";
import { Bio } from "../data/constants";

const SidebarContainer = styled.div`
  position: fixed;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 10px;
  z-index: 1000;
`;

const SocialIcon = styled(motion.a)`
  color: ${({ theme }) => theme.text_primary || "#ffffff"};
  font-size: 32px;
  transition: all 0.3s ease-in-out;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg || "#222"};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary || "#f39c12"};
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const SidebarSocialIcons = () => {
  return (
    <SidebarContainer>
      {[
        { href: Bio.github, icon: <FaGithub /> },
        { href: Bio.linkedin, icon: <FaLinkedin /> },
        { href: Bio.email, icon: <FaEnvelope /> },
        { href: Bio.whatsapp, icon: <FaWhatsapp /> },
        { href: Bio.resume, icon: <FaFileAlt /> },
        { href: Bio.facebook, icon: <FaFacebook /> },
        { href: Bio.insta, icon: <FaInstagram /> },
      ].map((item, index) => (
        <SocialIcon
          key={index}
          href={item.href}
          target="_blank"
          whileHover={{
            scale: 1.3, // توسع سلس
            rotate: [0, 8, -8, 0], // اهتزاز خفيف
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
          whileTap={{ scale: 0.9 }} // تصغير طفيف عند النقر
        >
          {item.icon}
        </SocialIcon>
      ))}
    </SidebarContainer>
  );
};

export default SidebarSocialIcons;
