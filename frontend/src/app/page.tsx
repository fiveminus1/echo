import { Card, CardContent  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main>
      <Card>
        <CardContent>
          <h1>Welcome to Echo</h1>
          <p>
            Blah blah blah....
          </p>
          <Button>
            Login with Spotify
            <ArrowRight />
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
