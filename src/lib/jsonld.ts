/** Sérialise un objet JSON-LD pour l'insérer dans une balise script.
 *
 *  JSON.stringify ne neutralise pas la séquence « </script> » : une valeur
 *  qui la contiendrait fermerait la balise et injecterait du HTML. On
 *  remplace donc <, > et & par leurs échappements Unicode. Le résultat reste
 *  du JSON valide, qui se relit à l'identique.
 *
 *  Attention à l'écriture : '\\u003c' (six caractères) et non '<', qui
 *  n'est que le caractère < lui-même et ne protégerait de rien. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
