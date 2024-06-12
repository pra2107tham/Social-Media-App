import { Modal, useMantineTheme, MantineProvider } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

function ShareModal({ modalOpened, setModalOpened }) {
  return (
    <MantineProvider>
      <ModalComponent modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </MantineProvider>
  );
}

function ModalComponent({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    />
  );
}

export default ShareModal;
