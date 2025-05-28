"use client";

type Props = {
    name: string;
}

export function UserHeadingClient({ name }: Props) {
    return (
        <div className="text-right">
          <p className="text-muted-foreground">
            Owner: <span className="text-xl font-semibold text-primary">
                    {name}
                </span>
            </p>
        </div>
    )
}