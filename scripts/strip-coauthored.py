import re
import sys

msg = sys.stdin.read()
lines = msg.splitlines()
filtered = [
    line
    for line in lines
    if not re.match(
        r"^Co-authored-by:\s*(Cursor|Claude|cursoragent|.*[Aa]gent.*)\b",
        line,
        re.IGNORECASE,
    )
    and not re.search(r"cursoragent@|@cursor\.com|anthropic", line, re.IGNORECASE)
]
print("\n".join(filtered).rstrip() + ("\n" if filtered else ""), end="")
