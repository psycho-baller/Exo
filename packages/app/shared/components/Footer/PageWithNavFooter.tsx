import { Page, FloatingFooter } from '@acme/ui';
import type { PageProps } from '@acme/ui';
import type { FC } from 'react'
import { Plus, Search, Home, CircleUser, Settings, X, CheckCircle2 } from "@tamagui/lucide-icons";
import { Button } from 'tamagui';
import { useAddFriendStore } from '../../../stores/addQuestion';
import { AddQuestion } from './../Footer/AddQuestion';
import { Link } from 'solito/link';
interface Props extends PageProps {
}

export const PageWithNavFooter: FC<Props> = ({ children }) => {
  const [setDropdownOpen] = useAddFriendStore((state) => [state.setDropdownOpen]);

  function handlePlusClick(){
    setDropdownOpen(true);
  }

  return (
    <Page>
      {children}
      <FloatingFooter blurIntensity={70} >
        <Link href="/">
          <Home size={"$2"} />
        </Link>
        <Link href="/friends">
          <CircleUser size={"$2"} />
        </Link>
        <Button unstyled onPress={handlePlusClick} icon={<Plus size={"$2.5"} />}/>
        <Search size={"$2"} />
        <Settings size={"$2"} />
      </FloatingFooter>
      <AddQuestion />
    </Page>
  );
};
