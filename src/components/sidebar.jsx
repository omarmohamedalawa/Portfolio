import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Bio } from "../data/constants";
import { FaBars, FaGithub, FaLinkedin, FaFileAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

// ✅ الحاوية الأساسية
const MobileMenuContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  overflow: visible;

  @media (min-width: 768px) {
    bottom: 50%;
    right: auto;
    left: 20px;
    width: auto;
    height: auto;
    transform: translateY(50%);
    flex-direction: column;
  }
`;

// ✅ زر القائمة الرئيسي (يختفي في الكمبيوتر)
const MainButton = styled(motion.button)`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #333;
  color: #fff;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 0;
  right: 0;

  @media (min-width: 768px) {
    display: none; /* يخفي الزر في الكمبيوتر */
  }
`;

// ✅ أيقونات السوشيال ميديا
const SocialIcon = styled(motion.a)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #333;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: absolute;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #854CE6;
    color: white;
  }

  @media (min-width: 768px) {
    position: relative;
    margin: 10px 0;
  }
`;

const SidebarSocialIcons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // ✅ تحديث وضع الكمبيوتر عند تغيير حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ توزيع الأيقونات حول الزر الرئيسي في الموبايل
  const socialIcons = [
    { icon: <FaGithub />, link: Bio.github },
    { icon: <FaLinkedin />, link: Bio.linkedin },
    { icon: <FaWhatsapp />, link: Bio.Whatsapp },
    { icon: <FaEnvelope />, link: Bio.email },
    { icon: <FaFileAlt />, link: Bio.resume }
  ];

  return (
    <MobileMenuContainer>
      {/* ✅ زر القائمة الرئيسي (يظهر فقط في الموبايل) */}
      {!isDesktop && (
        <MainButton onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.9 }}>
          <FaBars />
        </MainButton>
      )}

      {/* ✅ توزيع الأيقونات */}
      {socialIcons.map((item, index) => {
        if (isDesktop) {
          return (
            <SocialIcon key={index} href={item.link} target="_blank">
              {item.icon}
            </SocialIcon>
          );
        }

        const totalIcons = socialIcons.length;
        const angle = (index * 250) / (totalIcons - 1); // توزيع متساوي
        const baseRadius = 60;
        const extraGap = index === 0 ? 10 : 10;

        const x = baseRadius * Math.cos((angle * Math.PI) / 180);
        const y = -baseRadius * Math.sin((angle * Math.PI) / 180) - extraGap;

        return (
          <SocialIcon
            key={index}
            href={item.link}
            target="_blank"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: isOpen ? x : 0,
              y: isOpen ? y : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {item.icon}
          </SocialIcon>
        );
      })}
    </MobileMenuContainer>
  );
};

export default SidebarSocialIcons;
