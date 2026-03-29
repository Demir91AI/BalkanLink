interface Props {
  isEU: boolean;
}

export default function CountryInfoBox({ isEU }: Props) {
  if (isEU) {
    return (
      <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 mb-6 flex items-start gap-2">
        <span className="text-base shrink-0">🇪🇺</span>
        <p className="text-xs text-green-300">
          <b>EU državljanin</b> — Kao EU državljanin imaš slobodu kretanja i rada u Njemačkoj bez vize. Trebaš samo Anmeldung nakon dolaska.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#EAB308]/30 bg-[#EAB308]/10 p-3 mb-6 flex items-start gap-2">
      <span className="text-base shrink-0">🌍</span>
      <p className="text-xs text-[#EAB308]/90">
        <b>Western Balkans regulativa</b> — Kao državljanin Western Balkans zemalja imaš olakšan pristup njemačkom tržištu rada bez prethodnog priznavanja diplome u određenim sektorima. Više info:{" "}
        <a href="https://www.make-it-in-germany.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#EAB308]">
          make-it-in-germany.com
        </a>
      </p>
    </div>
  );
}
