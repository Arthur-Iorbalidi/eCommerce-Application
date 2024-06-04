/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-one-expression-per-line */

export function highlightTextBeforeColon(text: string) {
  const regex = /([^:]+):(.*)/;
  const match = text.match(regex);

  if (match) {
    const [, beforeColon, afterColon] = match;

    const hasAfterColonContent = afterColon.trim().length > 0;

    return hasAfterColonContent ? (
      <>
        <strong>{beforeColon.trim()}</strong>: {afterColon}
      </>
    ) : (
      <>{text}</>
    );
  }
  return <>{text}</>;
}

export default function splitTextIntoLines(text?: string, decorate?: boolean) {
  if (!text) {
    return [];
  }

  return text.split('\n').map((elem, index) => {
    const key = `${index}_${elem}`;

    return (
      <span key={key}>{decorate ? highlightTextBeforeColon(elem) : elem}</span>
    );
  });
}
