
import styled from 'styled-components';
import { Folder } from 'lucide-react';

// Στυλ για το εικονίδιο του φακέλου
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  cursor: pointer;
  color: white;
  text-shadow: 1px 1px 2px black;
  padding: 5px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    outline: 1px dotted white;
  }
`;

const IconLabel = styled.span`
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
  word-break: break-word;
  max-width: 80px;
`;

interface FolderIconProps {
  name: string;
  onClick: () => void;
}

export function FolderIcon({ name, onClick }: FolderIconProps) {
  return (
    <IconWrapper onClick={onClick} title={`Διπλό κλικ για άνοιγμα του ${name}`}>
      {/* Χρησιμοποιούμε το Folder από το lucide-react με κλασικό κίτρινο χρώμα */}
      <Folder size={36} color="#ffe066" fill="#ffe066" />
      <IconLabel>{name}</IconLabel>
    </IconWrapper>
  );
}

export default FolderIcon;
