import { ReactNode } from "react"
import { Container, Paper, styled } from "@mui/material"

const StyledContainer = styled(Container)(() => ({
  width: "480px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(6),
  paddingBottom: theme.spacing(8),
  boxShadow: theme.shadows[3],
}))

interface AuthPaperProps {
  children: ReactNode
}

export default function AuthPaper({ children }: AuthPaperProps) {
  return (
    <StyledContainer>
      <StyledPaper>{children}</StyledPaper>
    </StyledContainer>
  )
}
