import { ReactNode } from "react"
import { Container, Paper, styled } from "@mui/material"

const StyledContainer = styled(Container)(() => ({
  width: "1280px",
  minWidth: "1280px",
  borderRadius: "4px",
  backgroundColor: "transparent",
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  boxShadow: theme.shadows[3],
  background: "#F9F9F9",
}))

interface HomePaperProps {
  children: ReactNode
}

export default function HomePaper({ children }: HomePaperProps) {
  return (
    <StyledContainer>
      <StyledPaper>{children}</StyledPaper>
    </StyledContainer>
  )
}
